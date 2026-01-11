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