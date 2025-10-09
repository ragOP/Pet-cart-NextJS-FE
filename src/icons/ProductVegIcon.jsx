const ProductVegIcon = ({ size = 20 }) => {
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
                    border: '2px solid #008300',
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
                        backgroundColor: '#008300',
                        borderRadius: '50%',
                    }}
                />
            </div>
            <span
                style={{
                    fontSize: `${size * 0.27}px`,
                    color: '#008300',
                    fontWeight: '500',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.6px',
                }}
            >
                VEG
            </span>
        </div>
    );
};

export default ProductVegIcon;
