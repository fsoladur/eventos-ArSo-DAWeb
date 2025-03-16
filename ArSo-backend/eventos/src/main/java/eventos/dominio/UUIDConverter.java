package eventos.dominio;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.UUID;

@Converter(autoApply = true) // Aplica la conversión automáticamente en toda la aplicación
public class UUIDConverter implements AttributeConverter<UUID, String> {

    @Override
    public String convertToDatabaseColumn(UUID uuid) {
        return (uuid == null) ? null : uuid.toString();
    }

    @Override
    public UUID convertToEntityAttribute(String uuid) {
        return (uuid == null) ? null : UUID.fromString(uuid);
    }
}
