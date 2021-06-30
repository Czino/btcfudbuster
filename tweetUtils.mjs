import config from './config.mjs'
import Twitter from 'twitter'

const client = new Twitter(config.twitterAPI)

export const getTweet = id => {
  return new Promise(resolve => {
    console.log('Get tweet', id)
    client.get('statuses/show.json', {
      id: id
    }, (error, tweet, response) => {
      // TODO handle error cases
      resolve(tweet)
    })
  })
}

export const getLatestTweets = since_id => {
  return new Promise(resolve => {
    console.log('Get latest mentions')
    client.get('statuses/mentions_timeline.json', {
      since_id
    }, (error, tweets, response) => {
      // TODO handle error cases
      resolve(tweets)
    })
  })
}

/**
 * @description Method to send tweet
 * @param {Object} tweet the tweet to reply to
 * @returns {Promise}
 */
export const sendTweet = (replyTo, message, user1, user2) => {
  return new Promise(resolve => {
    console.log('Reply to', replyTo)

    // twitter requires to tag user in reply to, we also tag the user that is meant to read the fud busting
    if (user2 === user1 || !user2) {
      message += ` @${user1}`
    } else {
      message += ` @${user2} and @${user1}`
    }
    client.post('statuses/update', {
      status: message,
      in_reply_to_status_id: tweet.id
    }, (error, tweet, response) => {
      if (error) {
        console.log(error)
      }
      resolve()
    })
  })
}