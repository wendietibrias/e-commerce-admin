import ReactLoading from 'react-loading';

type LoadingSpinnerProps = {
    width:number;
    height:number;
    color:string;
}

const LoadingSpinner = ({
    width,
    height,
    color
} : LoadingSpinnerProps) => {
     return (
        <ReactLoading type="spin" color={color} width={width} height={height} />
     )
}

export default LoadingSpinner;