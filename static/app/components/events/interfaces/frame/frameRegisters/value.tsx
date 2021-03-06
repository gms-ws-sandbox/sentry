import {Component} from 'react';
import styled from '@emotion/styled';

import AnnotatedText from 'sentry/components/events/meta/annotatedText';
import Tooltip from 'sentry/components/tooltip';
import {IconSliders} from 'sentry/icons';
import {t} from 'sentry/locale';
import {Meta} from 'sentry/types';

const REGISTER_VIEWS = [t('Hexadecimal'), t('Numeric')];

type Props = {
  value: string | number;
  meta?: Meta;
};

type State = {
  view: number;
};

class Value extends Component<Props, State> {
  state: State = {view: 0};

  toggleView = () => {
    this.setState(state => ({view: (state.view + 1) % REGISTER_VIEWS.length}));
  };

  formatValue() {
    const {value} = this.props;
    const {view} = this.state;

    try {
      const parsed = typeof value === 'string' ? parseInt(value, 16) : value;
      if (isNaN(parsed)) {
        return value;
      }

      switch (view) {
        case 1:
          return `${parsed}`;
        case 0:
        default:
          return `0x${('0000000000000000' + parsed.toString(16)).substr(-16)}`;
      }
    } catch {
      return value;
    }
  }

  render() {
    const formattedValue = this.formatValue();
    const {meta} = this.props;
    const {view} = this.state;

    return (
      <InlinePre data-test-id="frame-registers-value">
        <FixedWidth>
          <AnnotatedText value={formattedValue} meta={meta} />
        </FixedWidth>
        <Tooltip title={REGISTER_VIEWS[view]}>
          <Toggle onClick={this.toggleView} size="xs" />
        </Tooltip>
      </InlinePre>
    );
  }
}

export default Value;

const InlinePre = styled('pre')`
  display: inline;
`;

const FixedWidth = styled('span')`
  width: 11em;
  display: inline-block;
  text-align: right;
  margin-right: 1ex;
`;

const Toggle = styled(IconSliders)`
  opacity: 0.33;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
