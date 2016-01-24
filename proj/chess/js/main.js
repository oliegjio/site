function getBrowser()
{
    var ua = navigator.userAgent;    
    if (ua.search(/Chrome/) > 0) return "Google Chrome";
    if (ua.search(/Firefox/) > 0) return "Firefox";
    if (ua.search(/Opera/) > 0) return "Opera";
    if (ua.search(/Safari/) > 0) return "Safari";
    if (ua.search(/MSIE/) > 0) return "Explorer";
    return "false";
}