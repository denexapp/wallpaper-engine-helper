import { Typography, Link } from '@material-ui/core';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import React, { useEffect, useState } from 'react';
import TypedMessage from '../TypedMessage';

const Version: React.FC = () => {
  const [version, setVersion] = useState<string>();
  const [downloadedVersion, setDownloadedVersion] = useState<string>();

  useEffect(() => {
    const listener = (_event: IpcRendererEvent, releaseName: string) => {
      setDownloadedVersion(releaseName);
    };
    ipcRenderer.on('update-available', listener);
    return () => {
      ipcRenderer.removeListener('update-available', listener);
    };
  }, []);

  useEffect(() => {
    const listener = (_event: IpcRendererEvent, eventVersion: string) => {
      setVersion(eventVersion);
    };
    ipcRenderer.on('get-version', listener);
    ipcRenderer.send('get-version');
    return () => {
      ipcRenderer.removeListener('get-version', listener);
    };
  }, []);

  const versionNode =
    version === undefined ? null : (
      <Typography variant="body1">
        <TypedMessage id="versionVersion" values={{ version }} />
      </Typography>
    );

  const restart = (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      onClick={() => {
        ipcRenderer.send('restart-to-update');
      }}
    >
      <TypedMessage id="versionRestartToUpdate" />
    </Link>
  );

  const newVersionNode =
    downloadedVersion === undefined ? null : (
      <Typography variant="body1">
        <TypedMessage
          id="versionNewVersionDownloaded"
          values={{ version, restart }}
        />
      </Typography>
    );

  return (
    <div>
      {versionNode}
      {newVersionNode}
    </div>
  );
};

export default Version;
