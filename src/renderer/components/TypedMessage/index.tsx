import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Props } from 'react-intl/src/components/message';
import { MessageKey } from '../../../common/localization';

const TypedMessage: React.FC<Props & { id: MessageKey }> = (props) => (
  <FormattedMessage {...props} />
);

export default TypedMessage;
