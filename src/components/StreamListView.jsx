import StreamCard from "./StreamCard";

const StreamListView = ({
  list,
  movies = false,
  tv = false,
  title = "Title",
}) => {
  return (
    <main>
      <p>{title}</p>
      <div>
        {list.map((obj, i) => {
          return <StreamCard key={i} obj={obj} />;
        })}
      </div>
    </main>
  );
};

export default StreamListView;
