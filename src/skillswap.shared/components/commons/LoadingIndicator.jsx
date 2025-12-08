import './LoadingIndicator.css';

export const LoadingIndicator = ({ height }) => {
    return (
        <div className="window"
             style={{ height: height ? height : '70vh' }}>
            <div className="loader"></div>
        </div>
    );
};

export default LoadingIndicator;