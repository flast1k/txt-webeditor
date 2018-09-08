package home.flast1k.system.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Audit {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String data;

    @Column(name = "event_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date eventDate;

    public Audit() {
    }

    public Audit(String data, Date eventDate) {
        this.data = data;
        this.eventDate = eventDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    @Override
    public String toString() {
        return "Audit{" +
                "id=" + id +
                ", data='" + data + '\'' +
                ", eventDate=" + eventDate +
                '}';
    }
}
