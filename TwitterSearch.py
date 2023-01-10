import requests 
import os 
import json
import time

bearer_token = '<BEARER-TOKEN>'

query = '#HASHTAG'
out_file = 'raw_tweets.txt'

search_url = 'https://api.twitter.com/2/tweets'

query_params = {'query': query,
                'max_results': 100
                }

def create_headers(bearer_token): 
    headers = {"Authorization: Bearer {}".format(bearer_token)}
    return headers

def connect_to_endpoint(url, headers, params, next_token = None): 
    if next_token: 
        params['next_token'] = next_token
    response = requests.request("GET", search_url, headers = headers, params = params)
    time.sleep(3.1)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def get_tweets(num_tweets, output_fh):
    next_token = None
    tweets_stored = 0
    while tweets_stored < num_tweets:
        headers = create_headers(bearer_token)
        json_response = connect_to_endpoint(search_url, headers, query_params, next_token)
        if json_response['meta']['result_count'] == 0:
            break
        author_dict = {x['id']: x['username'] for x in json_response['includes']['users']}
        for tweet in json_response['data']:
            try:
                tweet['username'] = author_dict[tweet['author_id']]
            except KeyError:
                print(f"No data for {tweet['author_id']}")
            output_fh.write(json.dumps(tweet) + '\n')
            tweets_stored += 1
        try:
            next_token = json_response['meta']['next_token']
        except KeyError:
            break
    return None



def main():
    with open(out_file, 'w') as f:
        get_tweets(500, f)



main()




