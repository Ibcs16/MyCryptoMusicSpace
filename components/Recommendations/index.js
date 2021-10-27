import React from "react";

const NoRecommendations = () => (
  <div className="noRecommendations">
    No recommendations yet. Make sure to connect wallet.
  </div>
);

const TotalRecommendations = ({ total }) => (
  <div className="totalRecommendations">{total} total</div>
);

const RecommendationsItem = ({ address, song, date }) => {
  const renderSong = () => {
    if (song?.includes("http")) {
      return (
        <a
          className="body-link-md block w-[250px] truncate"
          href={song}
          target="_blank"
          rel="noreferrer"
        >
          {song}
        </a>
      );
    } else {
      return song;
    }
  };
  return (
    <tr className="table-row">
      <td className="hidden md:block w-[350px] ">{address}</td>
      <td>{renderSong()}</td>
      <td>{date}</td>
    </tr>
  );
};

const Recommendations = ({ recommendations = [] }) => {
  return (
    <table className="table-auto">
      <caption className="mb-6 text-left title-md">
        Last recommendations:
      </caption>
      <thead>
        <tr className="table-col">
          <th className="hidden md:block">Recommended by</th>
          <th>Song</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {recommendations?.map((item, index) => (
          <RecommendationsItem key={`recommendation-${index}`} {...item} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">
            {recommendations?.length === 0 && <NoRecommendations />}
            {recommendations?.length > 0 && (
              <TotalRecommendations total={recommendations?.length} />
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Recommendations;
