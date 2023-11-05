// // Replace 'YOUR_API_KEY' with your actual API key
// const API_KEY = 'AIzaSyCeVRDJI0_W97KfTUt3VtoBm2xaIwXxX94';

// // Function to fetch most liked videos for a specific topic
// function fetchMostLikedVideos(topic) {
//     fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&order=viewCount&q=${topic}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok.');
//             }
//             return response.json();
//         })
//         .then(data => {
            
//             console.log(`data.items`,data.items);
//             displayVideos(data.items);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }


// // Function to ask the user for the topic
// function askForTopic() {
//     let topic = prompt('Enter the topic to search for on YouTube:');
//     // topic = topic.trim(); // Remove leading/trailing spaces

//     if (topic !== null && topic !== '') {
//         fetchMostLikedVideos(topic);
//     } else {
//         console.log('Please enter a valid topic.');
//     }
// }


// // Function to display videos on the webpage
// function displayVideos(videos) {
//     const videosContainer = document.getElementById('videos');
//     videosContainer.innerHTML = ''; // Clear previous results

//     videos.forEach(video => {
//         const videoId = video.id.videoId;
//         const title = video.snippet.title;

//         // Create an iframe for each video
//         const iframe = document.createElement('iframe');
//         iframe.width = '560';
//         iframe.height = '315';
//         iframe.src = `https://www.youtube.com/embed/${videoId}`;
//         iframe.title = title;

//         videosContainer.appendChild(iframe);
//     });
// }

// // Call the function to ask for the topic when the page loads
// window.onload = askForTopic;


// ====================================================================================


// Import the YouTube API library
    // Import the YouTube API library
const YouTube = require('youtube-api');

// Set the YouTube API key
const YouTubeAPIKey = 'AIzaSyCeVRDJI0_W97KfTUt3VtoBm2xaIwXxX94';

// Create a YouTube API object
const youtube = new YouTube(YouTubeAPIKey);

// Define an async function to search for videos on a given topic
async function searchVideos(topic) {
  // Create a new search request
  const searchRequest = youtube.search.list({
    q: topic,
    part: 'snippet',
    type: 'video',
    order: 'viewCount',
    maxResults: 10,
  });

  // Execute the search request and return the results
  return await searchRequest.execute();
}

// Define an async function to extract the best liked videos from a given list of videos
async function extractBestLikedVideos(videos) {
  // Create a new array to store the best liked videos
  const bestLikedVideos = [];

  // Iterate over the list of videos and add the best liked videos to the array
  for await (const video of videos) {
    // Get the video ID
    const videoId = video.id.videoId;

    // Create a new video statistics request
    const videoStatisticsRequest = youtube.videos.get({
      part: 'statistics',
      id: videoId,
    });

    // Execute the video statistics request and get the video's like count
    const videoStatisticsResponse = await videoStatisticsRequest.execute();
    const likeCount = videoStatisticsResponse.items[0].statistics.likeCount;

    // Add the video to the array of best liked videos if it has a higher like count than any of the other videos in the array
    if (likeCount > bestLikedVideos[0]?.statistics.likeCount) {
      bestLikedVideos.unshift(video);
    }
  }

  // Return the array of best liked videos
  return bestLikedVideos;
}

// Get the topic to search for
const topic = prompt('Enter a topic to search for: ');

// Search for videos on the given topic and extract the best liked videos
const bestLikedVideos = await extractBestLikedVideos(await searchVideos(topic));

// Display the best liked videos
for (const video of bestLikedVideos) {
  console.log(video.snippet.title);
}
