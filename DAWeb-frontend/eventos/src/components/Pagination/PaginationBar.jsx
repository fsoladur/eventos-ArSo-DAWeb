import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ totalPaginas, paginaActual, onPageChange, initialMaxEllipsis }) => {
  const maxEllipsisPaginas = initialMaxEllipsis; // Número máximo de páginas numéricas a mostrar
  
  // Calcular rango de páginas a mostrar
  let paginaInicioEllipsis = Math.max(1, paginaActual - Math.floor(maxEllipsisPaginas / 2)); // centrar la pagina  actual dentro de maxEllipsisPaginas
  let paginaFinEllipsis = Math.min(totalPaginas, paginaInicioEllipsis + maxEllipsisPaginas - 1);
  
  // Ajustar el rango si estamos cerca del final
  if (paginaFinEllipsis - paginaInicioEllipsis + 1 < maxEllipsisPaginas) {
    paginaInicioEllipsis = Math.max(1, paginaFinEllipsis - maxEllipsisPaginas + 1);
  }

  return (
    <Pagination className="justify-content-center mt-4">

      <Pagination.First 
        onClick={() => onPageChange(1)} 
        disabled={paginaActual === 1}
      />
      <Pagination.Prev 
        onClick={() => onPageChange(paginaActual > 1 ? paginaActual - 1 : 1)}
        disabled={paginaActual === 1}
      />
      
      {paginaInicioEllipsis > 1 && (
        <>
          <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>
          {paginaInicioEllipsis > 2 && <Pagination.Ellipsis disabled />}
        </>
      )}
      
      {Array.from({ length: paginaFinEllipsis - paginaInicioEllipsis + 1 }, (_, i) => (
        <Pagination.Item
          key={paginaInicioEllipsis + i}
          active={paginaInicioEllipsis + i === paginaActual}
          onClick={() => onPageChange(paginaInicioEllipsis + i)}
        >
          {paginaInicioEllipsis + i}
        </Pagination.Item>
      ))}
      
      
      {paginaFinEllipsis < totalPaginas && (
        <>
          {paginaFinEllipsis < totalPaginas - 1 && <Pagination.Ellipsis disabled />}
          <Pagination.Item onClick={() => onPageChange(totalPaginas)}>
            {totalPaginas}
          </Pagination.Item>
        </>
      )}
      
      {/* Botones de navegación Siguiente/Última */}
      <Pagination.Next 
        onClick={() => onPageChange(paginaActual < totalPaginas ? paginaActual + 1 : totalPaginas)}
        disabled={paginaActual === totalPaginas}
      />
      <Pagination.Last 
        onClick={() => onPageChange(totalPaginas)} 
        disabled={paginaActual === totalPaginas}
      />
    </Pagination>
  );
};

export default PaginationBar;
