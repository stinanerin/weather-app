interface Props {
    heading: string;
    data: number;
}

const InfoCard = ({heading, data}: Props) => {
  return (
    <article className="info-card">
        <h3>{heading}</h3>
        <p>{data}</p>
    </article>
  )
}

export default InfoCard