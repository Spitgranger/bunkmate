import { StreamChat } from 'stream-chat';
const chatClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_PRIVATE_API_KEY, {
    timeout: 6000,
});
//Endpoint for array of chats that users in involved in, returns an array objects.
//Each object has two key value pairs, username: array of usernames involved in the channel, channel: channel cid
export const getChats = async (req, res) => {
    const streamToken = req.params.token;
    const streamId = req.params.user_id;
    //console.log(streamToken, streamId);
    const filter = { type: 'messaging', members: { $in: [streamId] } };
    const sort = [{ last_message_at: -1 }];

    const channels = await chatClient?.queryChannels(filter, sort, {
        // watch: true, // this is the default
        state: true,
    });

    const responses = await channels.map(async (channel) => {
        const response = await chatClient.queryUsers(
            { id: { $in: Object.keys(channel.state.members) } },
        );
        // console.log(response)
        let usernames = []
        let ids = []
        response.users.forEach((element) => { console.log(element); usernames.push(element.name); ids.push(element.id) })
        return { usernames, ids, cid: channel.cid }
    })
    Promise.all(responses).then((response) => res.json(response).status(201))
}
