////import { registerRoute } from 'workbox-routing';
////import {
////    NetworkFirst,
////    StaleWhileRevalidate,
////    CacheFirst,
////} from 'workbox-strategies';

////// Used for filtering matches based on status code, header, or both
////import { CacheableResponsePlugin } from 'workbox-cacheable-response';
////// Used to limit entries in cache, remove entries after a certain period of time
////import { ExpirationPlugin } from 'workbox-expiration';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// Cache page navigations (html) with a Network First strategy
workbox.routing.registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === 'navigate',
    // Use a Network First caching strategy
    new workbox.strategies.NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: 'pages',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Cache images with a Cache First strategy
workbox.routing.registerRoute(
    // Check to see if the request's destination is style for items to cache, not wallet assets!
    ({ request }) =>
        request.url.startsWith("https://hookmanstatic.blob.core.windows.net/nftgallery/storage/")
        || request.url.startsWith("https://cardano-mainnet.blockfrost.io/api/v0/assets/")
        || request.url.startsWith("https://cardano-mainnet.blockfrost.io/api/v0/addresses/")
        || request.url.startsWith("https://infura-ipfs.io/ipfs/"),
    // Use a Cache First caching strategy
    new workbox.strategies.CacheFirst({
        // Put all cached files in a cache named 'images'
        cacheName: 'images',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200, 301]
            }),
            // Don't cache more than 50 items, and expire them after 30 days
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 9999,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            }),
        ],
    }),
);

//self.addEventListener('fetch', function (event) {
//    event.respondWith(fetch(event.request).catch((e) => {
//        //do nothing
//    }));
//});
