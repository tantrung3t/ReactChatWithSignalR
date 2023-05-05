using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;

        public ChatHub()
        {
            _botUser = "Hello I'm Bot this room!";
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            await Clients.All.SendAsync("ReceiveMessage", _botUser, userConnection.User,
                $"{userConnection.User} has joined {userConnection.Room}");
        }
    }
}
