const ProductNonVegIcon = ({ size = 20 }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1px',
            }}
        >
            <div
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    border: '2px solid #BE360D',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        width: `${size * 0.5}px`,
                        height: `${size * 0.5}px`,
                        backgroundColor: '#BE360D',
                        borderRadius: '50%',
                    }}
                />
            </div>
            <span
                style={{
                    fontSize: `${size * 0.25}px`,
                    color: '#BE360D',
                    fontWeight: '600',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.6px',
                }}
            >
                NON-VEG
            </span>
        </div>
    );
};

export default ProductNonVegIcon;
