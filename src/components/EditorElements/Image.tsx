interface Props {
    content: string
}

const Image = ({content}: Props) => {
    return <img src={content} alt="" />
}

export default Image;