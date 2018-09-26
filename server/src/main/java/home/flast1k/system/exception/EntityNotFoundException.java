package home.flast1k.system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "Entity not found")
public class EntityNotFoundException extends Exception {
    public EntityNotFoundException() {
        super();
    }
}
