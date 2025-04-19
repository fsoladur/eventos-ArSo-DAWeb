import { Accordion } from 'react-bootstrap';
import SpaceCard from '../Card/SpaceCard';

const SpaceList = ({ espacios, espacioExpandido, onExpand }) => (
  <Accordion activeKey={espacioExpandido?.toString()}>
    {espacios.map((espacio) => (
      <SpaceCard
        key={espacio.resumen.id}
        espacio={espacio}
        isExpanded={espacioExpandido === espacio.resumen.id}
        onExpand={() =>
          onExpand(espacioExpandido === espacio.resumen.id ? null : espacio.resumen.id)
        }
      />
    ))}
  </Accordion>
);

export default SpaceList;
