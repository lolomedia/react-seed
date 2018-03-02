import React from 'react';

const StoryBox = () => {
  const now = new Date();
  const topicsList = ['HTML', 'JavaScript', 'React'];
  return (
    <div>
      <h3>Stories App</h3>
      <p className="lead">
        Current time: {now.toTimeString()}
      </p>
      <ul>
        {topicsList.map(topic => <li>{topic}</li>)}
      </ul>
    </div>
  );
};
export default StoryBox;
