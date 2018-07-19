export const loadScript = (source: string, callback: any, id: string, alwaysCallback: boolean = false) => {
  if (!document.getElementById(id)) {
    const script = document.createElement('script') as any;
    script.setAttribute('id', id);
    script.async = true;
    script.src = source;
    script.onload = script.onreadystatechange = (_: any, isAbort: any) => {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;

        if (!isAbort) {
          callback();
        }
      }
    };
    const prior = document.getElementsByTagName('script')[0] as any;
    prior.parentNode.insertBefore(script, prior);
  } else if (alwaysCallback) {
    callback();
  }
};
