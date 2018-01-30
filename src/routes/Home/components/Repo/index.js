/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import defaultTheme from './theme.css';
import RepoModal from '../RepoModal';
import magnify from '../../../../images/magnify-white.svg';

export default function Repo({ theme, data, toggleOpenRepo, openRepoId }) {
  const spanClass =
    data.pullRequests.length > 5
      ? 'spanMax'
      : `span${data.pullRequests.length + 1}`;

  const countClass = data.pullRequests.length === 0 ? 'zeroCount' : null;

  const open = data.id === openRepoId;
  const onClick = () => {
    toggleOpenRepo(data.id);
  };

  const openRepo = open ? (
    <div>{<RepoModal data={data} toggleOpenRepo={toggleOpenRepo} />}</div>
  ) : null;

  const prSubset = data.pullRequests.slice(0, 5);

  const prRows = prSubset.map(pr => (
    <div className={theme.prRow} key={`subset_${data.id}_${pr.number}`}>
      <img
        className={theme.prAvatar}
        src={pr.author.avatarUrl}
        alt="author avatar"
      />
      <span className={theme.prAuthor}>{pr.author.login}</span>
    </div>
  ));

  return (
    <div
      className={`${theme.repoContainer} ${theme[spanClass]} ${open
        ? theme.open
        : null}`}
    >
      <div className={theme.repo}>
        <a href={data.url} className={theme.link}>
          <h3 className={theme.name}>{data.name}</h3>
        </a>
        <div className={theme.countContainer}>
          <span className={`${theme.prCount} ${theme[countClass]}`}>
            {data.pullRequests.length}
          </span>
          <span className={theme.prCountLabel}>OPEN</span>
        </div>
        {prRows}
        <button
          className={theme.magnify}
          onClick={onClick}
          data-test-id="magnify"
        >
          <img src={magnify} alt="magnify icon" className={theme.magnifyIcon} />
        </button>
      </div>
      {openRepo}
    </div>
  );
}

Repo.propTypes = {
  theme: PropTypes.shape(),
  data: PropTypes.shape({
    name: PropTypes.string,
    pullRequests: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  openRepoId: PropTypes.string,
  toggleOpenRepo: PropTypes.func.isRequired,
};

Repo.defaultProps = {
  theme: defaultTheme,
  openRepoId: null,
};
