import React from 'react';
import type { Link } from 'react-router-dom';
export interface NotFoundPageProps {
  /**
   * FIXME: This is expecting a react-router-dom Link component. We cannot keep the scope of the BrowserRouter (react-router component) on components outside the package.
   */
  routeLinkComponent: React.ReactElement<Link>;
}
export declare const NotFoundPage: (props: NotFoundPageProps) => React.ReactElement;
export default NotFoundPage;
