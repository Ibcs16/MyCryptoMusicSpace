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
        <a className="songLink" href={song} target="_blank" rel="noreferrer">
          {song}
        </a>
      );
    } else {
      return song;
    }
  };
  return (
    <tr>
      <td>{address}</td>
      <td>{renderSong()}</td>
      <td>{date}</td>
    </tr>
  );
};

const Recommendations = ({ recommendations = [] }) => {
  return (
    <table>
      <caption className="table-title">Last recommendations:</caption>
      <thead>
        <tr>
          <th>Recommended by</th>
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
