import styled from '@emotion/styled';

import space from 'sentry/styles/space';

const HeaderSeparator = styled('div')`
  width: 1px;
  background-color: ${p => p.theme.border};
  margin: ${space(2)} 0;
`;

export default HeaderSeparator;
