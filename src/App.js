import { useEffect, useState } from "react";
// const KEY = "AIzaSyBzBRFCeqZd5IoGWNuatN5kI4oQBPcFxbo////AIzaSyAGkccpUdxy2vkLAkCxfoJNs-K-J8OfIuQ";
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBzBRFCeqZd5IoGWNuatN5kI4oQBPcFxbo&type=video&q=ajax
export default function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [playVideo, setPlayVideo] = useState("");
  useEffect(
    function () {
      async function searchvid() {
        if (search.length < 5) return;
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAGkccpUdxy2vkLAkCxfoJNs-K-J8OfIuQ&type=video&q=${search}&maxResults=30`
        );
        const data = await res.json();
        console.log(data.items);
        setVideos(data.items);
      }
      searchvid();
    },
    [search]
  );
  return (
    <div>
      <Header>
        <Logo />
        <Search videos={videos} setsearch={setSearch} />
      </Header>
      <Main>
        <Box>
          <VideoList videos={videos} setplay={setPlayVideo} />
        </Box>
        <Box>
          <Preview playVideo={playVideo} />
        </Box>
      </Main>
    </div>
  );
}

function Logo() {
  return <h3 className="logo">📺 useYouTube</h3>;
}

function Search({ videos, setsearch }) {
  return (
    <div className="searchdiv">
      <input
        className="searchtxt"
        type="text"
        placeholder="Topic Here"
        onChange={(e) => e.target.value}
        onKeyDown={(e) => {
          if (e.key === "Enter") setsearch(e.target.value);
        }}
      />
      <label className="searchlbl">
        {videos ? videos.length + " Videos Found" : "0 Result Found"}
      </label>
    </div>
  );
}
function Header({ children }) {
  return <div className="header">{children}</div>;
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="togglebtn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function VideoList({ videos, setplay }) {
  return (
    <ul className="topiclist">
      {videos.map((el, i) => (
        <li
          className="videolist"
          key={i}
          onClick={() => setplay(el.id.videoId)}
        >
          <img src={el.snippet.thumbnails.default.url} alt="Video" />
          <div>
            <span className="info">{`Channel Name:${el.snippet.channelTitle}`}</span>
            <span className="info">{`Title:${el.snippet.title}`}</span>
            <span className="info">{`Date:${el.snippet.publishedAt}`}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
function Preview({ playVideo }) {
  return (
    <div>
      <iframe
        title={playVideo}
        className="preview"
        src={playVideo ? `https://www.youtube.com/embed/${playVideo}` : ""}
      ></iframe>
    </div>
  );
}

// ({videos.map(()=>(<li className="topic">i need prop</li>)));
