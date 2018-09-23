package paths;

import com.google.gson.Gson;
import domain.Result;
import domain.User;
import service.MainServiceDao;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("")
public class Requests {

    @Inject
    private MainServiceDao mainServiceDao;

    @GET
    @Path("/data")
    public Response test() {
        return Response.ok("just test it").build();
    }

    @GET
    @Path("/get/{id}")
    public Response getUser(@PathParam("id") int userId) {
        User user = mainServiceDao.getUser(userId);
        Gson gson = new Gson();
        String json = gson.toJson(user);
        return Response
                .ok(json)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
    }

    @POST
    @Path(value = "/update")
    public Response updateVote(String data) {
        Gson gson = new Gson();
        Result result = gson.fromJson(data, Result.class);
        mainServiceDao.updateVote(result);
        return Response.ok("ok").build();
    }

}
