interface RateLimitConfig{
    capacity:number;
    leakrate:number;
    
}

interface BucketInfo{
    bucket_level:number;
    last_checked_time:number;
}

function Leaky(
    config:RateLimitConfig,
    binfo:BucketInfo,
    now:number,
 ):BucketInfo{
    const elapased=(now-binfo.last_checked_time)/1000;
    const leaked=elapased*config.leakrate;

    return{
        bucket_level:Math.max(0,binfo.bucket_level-leaked),
        last_checked_time:now
    };
}

function Consumption(
    //the parameters to be taken
    config:RateLimitConfig,
    binfo:BucketInfo,
    now:number,
    requests:number=1 
):
//we are defining how the output for the function should look like
{allowed:boolean; newBucket:BucketInfo} {

    const leakedBucket=Leaky(config,binfo,now);

    //leaky bucket implementation
    if(leakedBucket.bucket_level+1>config.capacity){
       return { allowed:false,
            newBucket:leakedBucket
       }
    }else{
        return {
            allowed: true,
            newBucket: {
              ...leakedBucket,
              bucket_level: leakedBucket.bucket_level + requests
            }
    }
}}