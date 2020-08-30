import React from 'react'
import { FormattedMessage } from 'react-intl'
import { MessageKey } from '../../localization'

const TypedMessage: React.FC<FormattedMessage['props'] & { id: MessageKey }> = props => (<FormattedMessage {...props} />)

export default TypedMessage
