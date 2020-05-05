import React from 'react';
import { render } from '@testing-library/react';
import Search from './pages/search';

test('render the ui', () => {
	const { getByText } = render(<Search />);
	const linkElement = getByText(/submit/i);
	expect(linkElement).toBeInTheDocument();
});
