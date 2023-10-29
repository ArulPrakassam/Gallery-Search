# Gallery Search App

Free Stock Images search app created by Arul Prakassam. Powered by pexels.com

[Gallery Search App](https://imagegallery-search-app.netlify.app/)

## API Reference

#### Get curated photos

```fetch
  GET https://api.pexels.com/v1/curated?page=1&per_page=40
```

#### Get photos for search query

```fetch
  GET https://api.pexels.com/v1/search?query=${value}&per_page=30&page=1
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `query`   | `string` | **Required**. search query to fetch |

## API Documentation

[Pexels API documentation](https://www.pexels.com/api/documentation/)

## Tech Stack

**Client:** HTML5, CSS3, JS

**Backend:** Express JS

**Hosting:** Netlify
