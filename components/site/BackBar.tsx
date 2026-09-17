import Link from 'next/link';

/** The "← GOD'S OWN MOTION PICTURES / MUMBAI, INDIA" strip repeated at the foot of every site page. */
export function BackBar() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 20,
        paddingTop: 'clamp(22px,4vh,40px)',
        borderTop: '1px solid rgba(236,230,218,.1)',
        fontSize: 9,
        letterSpacing: '.3em',
        color: '#8f887c',
      }}
    >
      <Link href="/" className="gs-hover-accent" style={{ color: '#8f887c' }}>
        ← GOD&apos;S OWN MOTION PICTURES
      </Link>
      <span>MUMBAI, INDIA</span>
    </div>
  );
}
