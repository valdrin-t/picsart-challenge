# Masonry Layout with Infinite Scroll

This project implements a responsive masonry grid layout with infinite scrolling, showcasing images fetched from the Unsplash API. It's built using React and TypeScript, focusing on performance and user experience.

## Features

- Responsive masonry grid layout
- Infinite scrolling
- Lazy loading of images
- Error handling
- TypeScript implementation

## Performance Optimizations

1. **Lazy Loading**: Images are loaded lazily using the `loading="lazy"` attribute, reducing initial load time and conserving bandwidth.

2. **Infinite Scroll**: Instead of loading all images at once, new images are fetched as the user scrolls, improving initial page load time and reducing memory usage.

3. **Memoization**: The `useMemo` and `useCallback` hooks are used to prevent unnecessary recalculations and re-renders.

4. **Virtualization**: Images sources are loaded on demand, as user scrolls close to them, to minimize bandwidth usage

5. **Intersection Observer**: Used for triggering infinite scroll, providing a smoother scrolling experience compared to scroll event listeners.

## Project Structure

- components/
  - `ErrorContainer.tsx`: Error container component for displaying error messages.
  - `InfiniteScrollTrigger.tsx`: Component that triggers loading more photos when scrolled into view.
  - `LoadingSkeleton.tsx`: Skeleton loader component for displaying loading state.
  - `MasonryGrid.tsx`: Implements the masonry grid layout.
- hooks/
  - `useGetPhotos.tsx`: Custom hook for fetching photos from the Unsplash API.
  - `useGetPhotoById.tsx`: Custom hook for fetching a specific photo by Id.
  - `useVirtualization.tsx`: Custom hook for virtualizing the grid layout.
  - `useWindowWidth.tsx`: Custom hook for detecting window width.
- routes/
  - `root.tsx`: Main component that handles the overall layout and state management.
  - `details.tsx`: Details view, displaying more information about the selected photo
- utils/
  - `api.ts`: Utility functions for interacting with the Unsplash API.

## Setup and Running the Project

1. Clone the repository:

   ```
   git clone https://github.com/valdrin-t/picsart-challenge.git
   cd [project-directory]
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. In the .env file provide your Unsplash API key.

   ```
   VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser to view the app.

## Future Improvements

1. Implement better virtualization, by adding and removing elements from the dom as necessary.
2. Render the initial layout in the server side, and preload the first few images to better improve LCP score
3. Calculate initial heights for the items to reduce layout shift
4. Implement progressive image loading (low-res thumbnails first, then high-res images).
5. Add unit and integration tests.
6. Implement search functionality
