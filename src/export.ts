/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: Unknown (JS)
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';


// Services


// Functions

export async function initTopicAndSubscribe(client: FluenceClient, node_id: string, topic: string, value: string, relay_id: string | null, service_id: string | null, config?: {ttl?: number}): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
         )
         (call %init_peer_id% ("getDataSrv" "topic") [] topic)
        )
        (call %init_peer_id% ("getDataSrv" "value") [] value)
       )
       (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
      )
      (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
     )
     (call -relay- ("op" "noop") [])
    )
    (xor
     (seq
      (call node_id ("op" "string_to_b58") [topic] k)
      (call node_id ("kad" "neighborhood") [k [] []] nodes)
     )
     (seq
      (call -relay- ("op" "noop") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (fold nodes n
   (par
    (xor
     (seq
      (seq
       (call n ("peer" "timestamp_sec") [] t)
       (call n ("aqua-dht" "register_key") [topic t false 0])
      )
      (call n ("aqua-dht" "put_value") [topic value t relay_id service_id 0])
     )
     (null)
    )
    (seq
     (call -relay- ("op" "noop") [])
     (next n)
    )
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'topic', () => {return topic;});
h.on('getDataSrv', 'value', () => {return value;});
h.on('getDataSrv', 'relay_id', () => {return relay_id === null ? [] : [relay_id];});
h.on('getDataSrv', 'service_id', () => {return service_id === null ? [] : [service_id];});
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for initTopicAndSubscribe');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      


export async function findSubscribers(client: FluenceClient, node_id: string, topic: string, config?: {ttl?: number}): Promise<{peer_id:string;relay_id:string[];service_id:string[];set_by:string;timestamp_created:number;value:string;weight:number}[]> {
    let request: RequestFlow;
    const promise = new Promise<{peer_id:string;relay_id:string[];service_id:string[];set_by:string;timestamp_created:number;value:string;weight:number}[]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
         )
         (call %init_peer_id% ("getDataSrv" "topic") [] topic)
        )
        (call -relay- ("op" "noop") [])
       )
       (xor
        (seq
         (call node_id ("op" "string_to_b58") [topic] k)
         (call node_id ("kad" "neighborhood") [k [] []] nodes)
        )
        (seq
         (seq
          (call -relay- ("op" "noop") [])
          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
         )
         (call -relay- ("op" "noop") [])
        )
       )
      )
      (call -relay- ("op" "noop") [])
     )
     (fold nodes n
      (par
       (seq
        (xor
         (seq
          (call n ("peer" "timestamp_sec") [] t)
          (call n ("aqua-dht" "get_values") [topic t] $res)
         )
         (null)
        )
        (call node_id ("op" "noop") [])
       )
       (seq
        (call -relay- ("op" "noop") [])
        (next n)
       )
      )
     )
    )
    (xor
     (call node_id ("aqua-dht" "merge_two") [$res.$.[0].result! $res.$.[1].result!] v)
     (seq
      (call -relay- ("op" "noop") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [v.$.result!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'topic', () => {return topic;});
                h.onEvent('callbackSrv', 'response', (args) => {
    const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for findSubscribers');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      
