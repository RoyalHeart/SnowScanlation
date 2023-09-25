const dropped = [
  "3acf4f7d-9ce3-40ee-b290-106569c76ea8",
  "f97979cc-c0dd-42e2-a32b-c56f8047f7ba",
];
const mangadexGroupUrl =
  "https://api.mangadex.org/manga?limit=32&offset=0&includes[]=cover_art&includes[]=artist&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=desc&group=2446d746-b30f-4cd7-8fab-89ab83363b1d";
const mangadexUrl = "https://mangadex.org";
const loader = document.querySelector("#loading");
function fetchManga() {
  loader.classList.add("display");
  var myHeaders = new Headers();
  myHeaders.append("authority", "api.mangadex.org");
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-US,en;q=0.9");
  myHeaders.append("origin", "https://mangadex.org");
  myHeaders.append("referer", "https://mangadex.org/");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="116", "Not)A;Brand";v="24", "Opera GX";v="102"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"Windows"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-site");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0"
  );

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://api.mangadex.org/manga?limit=32&offset=0&includes[]=cover_art&includes[]=artist&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=desc&group=2446d746-b30f-4cd7-8fab-89ab83363b1d"
    )}`
    // requestOptions
  )
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      return data.contents;
    })
    .then(function (json) {
      let data = JSON.parse(json).data;
      for (i in data) {
        let manga = data[i];
        if (dropped.includes(manga.id)) {
          continue;
        }
        let mangaTitleUrl = getMangaUrl(manga);
        let mangaName = getMangaName(manga);
        let coverUrl = getCoverUrl(manga);
        fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(coverUrl)}`
        )
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            let image = new Image();
            image.src = data.contents;
            let mangaDiv = document.createElement("div");
            mangaDiv.classList.add("manga");
            let mangaNameElement = document.createElement("h2");
            mangaNameElement.textContent = mangaName;
            let linkElement = document.createElement("a");
            linkElement.href = mangaTitleUrl;
            linkElement.appendChild(image);
            linkElement.appendChild(mangaNameElement);
            mangaDiv.appendChild(linkElement);
            mangaList = document.getElementsByClassName("manga-list")[0];
            mangaList.appendChild(mangaDiv);
            loader.remove();
            loader.classList.remove("display");
          });
      }
    });
}
function getMangaName(manga) {
  let titles = manga.attributes.title;
  if (titles.en) return titles.en;
}
function getMangaUrl(manga) {
  let mangaUrl = mangadexUrl + "/title/" + manga.id;
  return mangaUrl;
}

function getCoverUrl(manga) {
  let relationships = manga.relationships;
  let mangaId = manga.id;
  for (i in relationships) {
    let relationship = relationships[i];
    if (relationship.type == "cover_art") {
      let fileName = relationship.attributes.fileName;
      let coverArtUrl =
        mangadexUrl + "/covers/" + mangaId + `/${fileName}.512.jpg`;
      return coverArtUrl;
    }
  }
}

function getCoverImage(url) {
  return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
}

fetchManga();
