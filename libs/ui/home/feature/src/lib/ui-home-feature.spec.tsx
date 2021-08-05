import { render } from '@testing-library/react';

import UiHomeFeature from './ui-home-feature';

describe('UiHomeFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiHomeFeature />);
    expect(baseElement).toBeTruthy();
  });
});
