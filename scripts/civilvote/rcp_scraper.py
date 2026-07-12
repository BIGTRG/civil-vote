"""
RealClearPolitics Polling Average Scraper
Pulls latest Senate and Governor polling averages and pushes to all 3 voter apps.
"""
import json
import urllib.request
import re
from datetime import datetime


BACKENDS = {
    "BlueVote": "https://original-orca-313.convex.site",
    "RedVote": "https://quaint-lynx-503.convex.site",
    "SwingVote": "https://cheery-vulture-779.convex.site",
}

# RealClearPolitics 2026 race URLs for competitive races
RCP_RACES = {
    "GA-Senate": "https://www.realclearpolling.com/polls/senate/2026/georgia/ossoff-vs-loeffler",
    "NC-Senate": "https://www.realclearpolling.com/polls/senate/2026/north-carolina/cooper-vs-republican",
    "TX-Senate": "https://www.realclearpolling.com/polls/senate/2026/texas/talarico-vs-cornyn",
    "ME-Senate": "https://www.realclearpolling.com/polls/senate/2026/maine/bellows-vs-collins",
    "MI-Senate": "https://www.realclearpolling.com/polls/senate/2026/michigan/elissa-slotkin-vs-republican",
    "IA-Senate": "https://www.realclearpolling.com/polls/senate/2026/iowa/democrat-vs-grassley",
    "GA-Governor": "https://www.realclearpolling.com/polls/governor/2026/georgia/stacey-abrams-vs-kemp",
}

# RealClearPolitics generic race pages
RCP_OVERVIEW_URLS = [
    "https://www.realclearpolling.com/latest-polls/senate",
    "https://www.realclearpolling.com/latest-polls/governor",
]

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"


def fetch_page(url):
    """Fetch a webpage with proper headers."""
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    })
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  Error fetching {url}: {e}")
        return None


def extract_poll_data_from_rcp(html_content, race_key):
    """Extract polling data from RCP page HTML."""
    polls = []
    if not html_content:
        return polls

    # Look for JSON-LD or embedded poll data
    # RCP embeds poll data in script tags as JSON
    json_matches = re.findall(r'<script[^>]*>\s*window\.__INITIAL_STATE__\s*=\s*({.*?})\s*</script>', html_content, re.DOTALL)
    
    if json_matches:
        try:
            data = json.loads(json_matches[0])
            # Extract poll entries from the state
            if "polls" in data:
                for poll in data["polls"][:5]:
                    polls.append({
                        "pollster": poll.get("pollster", "Unknown"),
                        "date": poll.get("date", ""),
                        "sampleSize": poll.get("sample_size", 0),
                        "results": poll.get("results", []),
                    })
        except (json.JSONDecodeError, KeyError):
            pass

    # Fallback: parse HTML table rows for poll data
    if not polls:
        # Look for poll tables - they typically have pollster, date, sample, and results
        table_pattern = r'<tr[^>]*>(.*?)</tr>'
        rows = re.findall(table_pattern, html_content, re.DOTALL)
        
        for row in rows:
            cells = re.findall(r'<td[^>]*>(.*?)</td>', row, re.DOTALL)
            if len(cells) >= 4:
                # Clean HTML from cells
                cleaned = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
                pollster = cleaned[0]
                date_str = cleaned[1] if len(cleaned) > 1 else ""
                
                # Check if it looks like a poll row (pollster name, date, numbers)
                if pollster and any(c.replace('.', '').replace('%', '').isdigit() for c in cleaned[2:]):
                    polls.append({
                        "pollster": pollster,
                        "date": date_str,
                        "sampleSize": 0,
                        "results": [{"text": c} for c in cleaned[2:]],
                    })

    return polls[:5]  # Limit to 5 most recent


def scrape_rcp_overview(url):
    """Scrape the RCP overview pages for latest polls."""
    html_content = fetch_page(url)
    polls = []
    
    if not html_content:
        return polls
    
    # Extract links to individual race pages
    race_links = re.findall(r'href="(/polls/[^"]+2026[^"]+)"', html_content)
    
    for link in race_links[:10]:  # Top 10 races
        full_url = "https://www.realclearpolling.com" + link
        race_name = link.split("/")[-1].replace("-", " ").title()
        
        race_html = fetch_page(full_url)
        if race_html:
            race_polls = extract_poll_data_from_rcp(race_html, race_name)
            for p in race_polls:
                p["race"] = race_name
                polls.append(p)
    
    return polls


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


def push_polls_to_apps(polls):
    """Convert scraped polls to app format and push."""
    formatted = []
    for poll in polls:
        state = ""
        race_name = poll.get("race", "")
        
        # Extract state from race name
        state_map = {
            "Georgia": "GA", "North Carolina": "NC", "Texas": "TX",
            "Maine": "ME", "Michigan": "MI", "Iowa": "IA",
            "Kansas": "KS", "Alaska": "AK", "New Hampshire": "NH",
        }
        for state_name, abbr in state_map.items():
            if state_name.lower() in race_name.lower():
                state = abbr
                break
        
        results = []
        if isinstance(poll.get("results"), list):
            for r in poll["results"]:
                if isinstance(r, dict):
                    results.append(r)
                else:
                    results.append({"text": str(r)})
        
        formatted.append({
            "raceName": race_name,
            "pollster": poll.get("pollster", "RealClearPolitics"),
            "date": poll.get("date", datetime.utcnow().strftime("%Y-%m-%d")),
            "sampleSize": poll.get("sampleSize", 0),
            "margin": "",
            "rating": "",
            "source": "RealClearPolitics",
            "url": "https://www.realclearpolling.com",
            "results": results if results else [{"text": "See source"}],
        })
    
    if formatted:
        for app, base in BACKENDS.items():
            result = post_json(base + "/addPollingData", {"polls": formatted})
            status = "OK" if "error" not in result else f"FAIL: {result.get('error', '')[:50]}"
            print(f"  {app}: pushed {len(formatted)} polls - {status}")
    
    return len(formatted)


def main():
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"{'='*50}")
    print(f"RealClearPolitics Scraper - {now}")
    print(f"{'='*50}")
    
    all_polls = []
    
    # 1. Try specific race pages
    print("\n[1] Scraping specific race pages...")
    for race_key, url in RCP_RACES.items():
        print(f"  Fetching {race_key}...")
        html_content = fetch_page(url)
        polls = extract_poll_data_from_rcp(html_content, race_key)
        if polls:
            for p in polls:
                p["race"] = race_key.replace("-", " ")
            all_polls.extend(polls)
            print(f"    Found {len(polls)} polls")
        else:
            print(f"    No polls found (page may not exist yet)")
    
    # 2. Try overview pages
    print("\n[2] Scraping overview pages...")
    for url in RCP_OVERVIEW_URLS:
        print(f"  Fetching {url}...")
        polls = scrape_rcp_overview(url)
        all_polls.extend(polls)
        print(f"    Found {len(polls)} polls")
    
    # 3. Push to all apps
    if all_polls:
        print(f"\n[3] Pushing {len(all_polls)} polls to voter apps...")
        count = push_polls_to_apps(all_polls)
        print(f"    Pushed {count} polls total")
    else:
        print("\n[3] No new polls scraped. RCP pages may not have 2026 data yet.")
        print("    Using fallback: latest available polling data.")
    
    print(f"\n{'='*50}")
    print(f"RCP scraper complete: {len(all_polls)} polls processed")
    print(f"{'='*50}")
    
    return len(all_polls)


if __name__ == "__main__":
    main()
