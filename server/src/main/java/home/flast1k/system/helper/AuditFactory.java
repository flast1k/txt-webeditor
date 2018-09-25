package home.flast1k.system.helper;

import home.flast1k.system.model.Audit;
import home.flast1k.system.model.FileInfo;

import java.util.Date;

public class AuditFactory {

    public static Audit createAuditForUploadAction(FileInfo fileInfo) {
        String data = String.format("File was uploaded. Assigned id = %s", fileInfo.getId());
        return new Audit(data, new Date());
    }

    public static Audit createAuditForUpdateAction(FileInfo fileInfo) {
        String data = String.format("File with id = %s was updated", fileInfo.getId());
        return new Audit(data, new Date());
    }

    public static Audit createAuditForDownloadAction() {
        String data = "Custom file was created and downloaded without saving in database";
        return new Audit(data, new Date());
    }

    public static Audit createAuditForExceptionAction(String errorMessage) {
        String data = String.format("ERROR: ", errorMessage);
        return new Audit(data, new Date());
    }
}
