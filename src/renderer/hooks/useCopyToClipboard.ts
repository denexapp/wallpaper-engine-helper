import usePushToast from './usePushToast';

const useCopyToClipboard = () => {
  const pushToast = usePushToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      pushToast('copySuccess', 'success');
    } catch {
      pushToast('copyFail', 'error');
    }
  };

  return copyToClipboard;
};

export default useCopyToClipboard;
