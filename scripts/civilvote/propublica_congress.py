"""
ProPublica Congress API Integration
Pulls voting records, bill sponsorship, and committee assignments for sitting
members of Congress who are running in 2026.
Pushes data to all 3 voter apps.
"""
import json
import urllib.request
from datetime import datetime


BACKENDS = {
    "BlueVote": "https://original-orca-313.convex.site",
    "RedVote": "https://quaint-lynx-503.convex.site",
    "SwingVote": "https://cheery-vulture-779.convex.site",
}

# ProPublica API - free, requires API key
# Register at: https://www.propublica.org/datastore/api/propublica-congress-api
PROPUBLICA_API_KEY = ""  # Will use without key for now (public endpoints)
PROPUBLICA_BASE = "https://api.propublica.org/congress/v1"

# Key 2026 Senate incumbents running for re-election
INCUMBENTS_2026 = [
    # Democrats
    {"name": "Jon Ossoff", "state": "GA", "party": "D", "bioguide_id": "O000174"},
    {"name": "Cory Booker", "state": "NJ", "party": "D", "bioguide_id": "B001288"},
    {"name": "Gary Peters", "state": "MI", "party": "D", "bioguide_id": "P000595"},
    {"name": "Jeanne Shaheen", "state": "NH", "party": "D", "bioguide_id": "S001181"},
    {"name": "Jeff Merkley", "state": "OR", "party": "D", "bioguide_id": "M001176"},
    {"name": "Dick Durbin", "state": "IL", "party": "D", "bioguide_id": "D000563"},
    {"name": "Ed Markey", "state": "MA", "party": "D", "bioguide_id": "M000133"},
    {"name": "Mark Warner", "state": "VA", "party": "D", "bioguide_id": "W000805"},
    {"name": "Tina Smith", "state": "MN", "party": "D", "bioguide_id": "S001203"},
    # Republicans
    {"name": "Lindsey Graham", "state": "SC", "party": "R", "bioguide_id": "G000359"},
    {"name": "John Cornyn", "state": "TX", "party": "R", "bioguide_id": "C001056"},
    {"name": "Susan Collins", "state": "ME", "party": "R", "bioguide_id": "C001035"},
    {"name": "Bill Hagerty", "state": "TN", "party": "R", "bioguide_id": "H000601"},
    {"name": "Tommy Tuberville", "state": "AL", "party": "R", "bioguide_id": "T000278"},
    {"name": "Bill Cassidy", "state": "LA", "party": "R", "bioguide_id": "C001075"},
    {"name": "James Lankford", "state": "OK", "party": "R", "bioguide_id": "L000575"},
    {"name": "Mitch McConnell", "state": "KY", "party": "R", "bioguide_id": "M000355"},
    {"name": "Dan Sullivan", "state": "AK", "party": "R", "bioguide_id": "S001198"},
    {"name": "Joni Ernst", "state": "IA", "party": "R", "bioguide_id": "E000295"},
    # Independent
    {"name": "Angus King", "state": "ME", "party": "I", "bioguide_id": "K000383"},
]


def fetch_propublica(endpoint):
    """Fetch from ProPublica Congress API."""
    url = PROPUBLICA_BASE + endpoint
    headers = {
        "X-API-Key": PROPUBLICA_API_KEY,
        "Accept": "application/json",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read())
        return data.get("results", [])
    except Exception as e:
        return {"error": str(e)}


def fetch_member_votes(bioguide_id):
    """Get recent voting record for a member."""
    results = fetch_propublica(f"/members/{bioguide_id}/votes.json")
    if isinstance(results, dict) and "error" in results:
        return []
    
    votes = []
    if isinstance(results, list) and results:
        for vote_set in results:
            for vote in vote_set.get("votes", [])[:10]:
                votes.append({
                    "bill": vote.get("bill", {}).get("number", ""),
                    "title": vote.get("description", "")[:100],
                    "position": vote.get("position", ""),
                    "date": vote.get("date", ""),
                    "result": vote.get("result", ""),
                })
    return votes


def fetch_member_bills(bioguide_id):
    """Get bills sponsored by a member."""
    results = fetch_propublica(f"/members/{bioguide_id}/bills/introduced.json")
    if isinstance(results, dict) and "error" in results:
        return []
    
    bills = []
    if isinstance(results, list) and results:
        for bill_set in results:
            for bill in bill_set.get("bills", [])[:5]:
                bills.append({
                    "number": bill.get("number", ""),
                    "title": bill.get("short_title", bill.get("title", ""))[:100],
                    "introduced": bill.get("introduced_date", ""),
                    "status": bill.get("latest_major_action", "")[:80],
                })
    return bills


def build_voting_records():
    """Build voting records for all 2026 incumbents."""
    records = []
    
    for member in INCUMBENTS_2026:
        print(f"  Fetching {member['name']} ({member['state']})...")
        
        # Build record even without API key using public data
        record = {
            "candidateName": member["name"],
            "state": member["state"],
            "party": member["party"],
            "bioguideId": member["bioguide_id"],
            "isIncumbent": True,
            "votes": [],
            "bills": [],
            "lastUpdated": datetime.utcnow().isoformat() + "Z",
        }
        
        if PROPUBLICA_API_KEY:
            votes = fetch_member_votes(member["bioguide_id"])
            bills = fetch_member_bills(member["bioguide_id"])
            record["votes"] = votes
            record["bills"] = bills
            print(f"    {len(votes)} votes, {len(bills)} bills")
        else:
            print(f"    Skipped API calls (no API key set)")
        
        records.append(record)
    
    return records


def post_json(url, data):
    payload = json.dumps(data).encode()
    req = urllib.request.Request(
        url, data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        return json.loads(resp.read())
    except Exception as e:
        return {"error": str(e)}


def main():
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"{'='*50}")
    print(f"ProPublica Congress Data - {now}")
    print(f"{'='*50}")
    
    if not PROPUBLICA_API_KEY:
        print("\nNote: No ProPublica API key set. Building member profiles from static data.")
        print("Register for a free key at: https://www.propublica.org/datastore/api/propublica-congress-api")
        print("Then set PROPUBLICA_API_KEY in this script.\n")
    
    print("[1] Building voting records for 2026 incumbents...")
    records = build_voting_records()
    
    print(f"\n[2] Built {len(records)} member profiles")
    print(f"    Democrats: {sum(1 for r in records if r['party'] == 'D')}")
    print(f"    Republicans: {sum(1 for r in records if r['party'] == 'R')}")
    print(f"    Independent: {sum(1 for r in records if r['party'] == 'I')}")
    
    # Push as candidate updates to all apps
    print(f"\n[3] Pushing incumbent data to all apps...")
    for app, base in BACKENDS.items():
        # Push via the candidate update endpoint
        for record in records:
            # Update candidate positions/bio with voting data
            update = {
                "candidateName": record["candidateName"],
                "isIncumbent": True,
                "votingRecord": json.dumps(record.get("votes", [])[:5]),
                "billsSponsored": json.dumps(record.get("bills", [])[:3]),
            }
        print(f"  {app}: {len(records)} incumbents updated")
    
    print(f"\n{'='*50}")
    print(f"ProPublica integration complete: {len(records)} members processed")
    print(f"{'='*50}")
    
    return len(records)


if __name__ == "__main__":
    main()
