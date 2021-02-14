import React from 'react';
import { FormattedMessage } from 'react-intl';
import { MessageKey } from '../../localization';

const TypedMessage: React.FC<FormattedMessage['props'] & { id: MessageKey }> = (
  props
  // eslint-disable-next-line react/jsx-props-no-spreading
) => <FormattedMessage {...props} />;

export default TypedMessage;
