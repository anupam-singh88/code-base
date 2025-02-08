const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listener

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

async function redisDataStructures() {
  try {
    await client.connect();
    // Strings -> SET - used to set a value, GET - used to get a value, MSET - used to set multiple values, MGET - used to get multiple values


    // await client.set("user:name", "Sangam Mukherjee");
    // const name = await client.get("user:name");
    // console.log(name);

    // await client.mSet([
    //   "user:email",
    //   "sangam@gmail.com",
    //   "user:age",
    //   "60",
    //   "user:country",
    //   "India",
    // ]);
    // const [email, age, country] = await client.mGet([
    //   "user:email",
    //   "user:age",
    //   "user:country",
    // ]);

    // console.log(email, age, country);

    // lists -> LPUSH - used to insert elm at beginning of list ,
    // RPUSH -> used to insert elm at end of list, 
    // LRANGE -> return elm from specific index in list,
    // LPOP -> remove and return first elm from list, 
    // RPOP -> remove and return last elm from list

    // await client.lPush("notes", ["note 1", "note 2", "note 3"]); //insert elm at beginning of list output: note 3, note 2, note 1
    // const extractAllNotes = await client.lRange("notes", 0, -1);
    // console.log(extractAllNotes); // [ 'note 3', 'note 2', 'note 1' ]

    // const firstNote = await client.lPop("notes");
    // console.log(firstNote); // note 3

    // const remainingNotes = await client.lRange("notes", 0, -1);
    // console.log(remainingNotes, "remainingNotes"); // [ 'note 2', 'note 1' ]

    // sets -> 
    // SADD -> add elm to set,
    //  SMEMBERS -> return all elms in set, 
    // SISMEMBER -> check if elm is present in set, 
    // SREM -> remove elm from set
    // await client.sAdd("user:nickName", ["john", "varun", "xyz"]);
    // const extractUserNicknames = await client.sMembers("user:nickName");

    // console.log(extractUserNicknames); // [ 'john', 'varun', 'xyz' ]

    // const isVarunIsOneOfUserNickName = await client.sIsMember(
    //   "user:nickName",
    //   "varun"
    // );
    // console.log(isVarunIsOneOfUserNickName); // true

    // await client.sRem("user:nickName", "xyz");

    // const getUpdatedUserNickNames = await client.sMembers("user:nickName");
    // console.log(getUpdatedUserNickNames); // [ 'john', 'varun' ]

    //sorted sets
    // ZADD -> add elm to sorted set, 
    // ZRANGE -> return elms from sorted set, 
    // ZRANK -> return rank of elm in sorted set, 
    // ZREM -> remove elm from sorted set,

    // await client.zAdd("cart", [
    //   {
    //     score: 100,
    //     value: "Cart 1",
    //   },
    //   {
    //     score: 150,
    //     value: "Cart 2",
    //   },
    //   {
    //     score: 10,
    //     value: "Cart 3",
    //   },
    // ]);

    // const getCartItems = await client.zRange("cart", 0, -1);
    // console.log(getCartItems); // [ 'Cart 3', 'Cart 1', 'Cart 2' ]

    // const extractAllCartItemsWithScore = await client.zRangeWithScores(
    //   "cart",
    //   0,
    //   -1
    // );
    // console.log(extractAllCartItemsWithScore); // [ { value: 'Cart 3', score: 10 }, { value: 'Cart 1', score: 100 }, { value: 'Cart 2', score: 150 } ]

    // const cartTwoRank = await client.zRank("cart", "Cart 2");
    // console.log(cartTwoRank); // 2     // 0 based index

    //hashes -> 
    // HSET -> set field in hash, 
    // HGET   -> get field from hash, 
    // HGETALL  -> get all fields from hash, 
    // HDEL -> delete field from hash,

    await client.hSet("product:1", {
      name: "Product 1",
      description: "product one description",
      rating: "5",
    });

    const getProductRating = await client.hGet("product:1", "rating");
    console.log(getProductRating); //5

    const getProductDetails = await client.hGetAll("product:1");
    console.log(getProductDetails); // { name: 'Product 1', description: 'product one description', rating: '5' }

    await client.hDel("product:1", "rating");

    const updatedProductDetails = await client.hGetAll("product:1");
    console.log(updatedProductDetails); // { name: 'Product 1', description: 'product one description' }
  } catch (e) {
    console.error(e);
  } finally {
    client.quit();
  }
}

redisDataStructures();
