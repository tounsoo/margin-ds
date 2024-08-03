// import { getMatchBounds } from '../../utils';

// export type HighlighterProps = {
//   children: string;
//   highlightClassName?: string;
//   search: string;
// }

// const Highlighter = ({
//   children,
//   highlightClassName = 'rbt-highlight-text',
//   search,
// }: HighlighterProps) => {
//   if (!search || !children) {
//     return <>{children}</>;
//   }

//   let matchCount = 0;
//   let remaining = children;

//   const highlighterChildren = [];

//   while (remaining) {
//     const bounds = getMatchBounds(remaining, search);

//     // No match anywhere in the remaining string, stop.
//     if (!bounds) {
//       highlighterChildren.push(remaining);
//       break;
//     }

//     // Capture the string that leads up to a match.
//     const nonMatch = remaining.slice(0, bounds.start);
//     if (nonMatch) {
//       highlighterChildren.push(nonMatch);
//     }

//     // Capture the matching string.
//     const match = remaining.slice(bounds.start, bounds.end);
//     highlighterChildren.push(
//       <mark className={highlightClassName} key={matchCount}>
//         {match}
//       </mark>
//     );
//     matchCount += 1;

//     // And if there's anything left over, continue the loop.
//     remaining = remaining.slice(bounds.end);
//   }

//   return <>{highlighterChildren}</>;
// };

// Highlighter.propTypes = propTypes;

// export default Highlighter;