import React, { useCallback, useEffect, useState } from 'react';
import Display from '../components/Display';
import useAuthentication from '../hooks/useAuthentication';
import useGetSettings from '../hooks/useGetSettings';
import Main from './Main';
import Settings from './Settings';

const Pages: React.FC = () => {
  useAuthentication();

  const getSettings = useGetSettings(true);
  useEffect(getSettings, [getSettings]);

  const [showSettings, setShowSettings] = useState(false);
  const onShowSettings = useCallback(() => setShowSettings(true), []);
  const onCloseSettings = useCallback(() => setShowSettings(false), []);
  const settings = showSettings ? <Settings onClose={onCloseSettings} /> : null;

  return (
    <>
      <Display hide={showSettings}>
        <Main onShowSettings={onShowSettings} />
      </Display>
      {settings}
    </>
  );
};

export default Pages;
