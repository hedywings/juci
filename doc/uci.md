uci openWrt
===============
Unified Configuration Interface

https://wiki.openwrt.org/zh-tw/doc/uci
對於OpenWrt而言, 我們可以將UCI視為系統中主要使用者操作介面, 用來操作系統中最重要的設定項目

基本原則
OpenWrt中主要的設定值, 被切割成好幾個獨立的檔案(UCI設定檔), 存放在系統的 /etc/config/ 目錄之中. 

大致上, 每一個設定檔會和它所屬的系統功能有關. 使用者可以透過文字編輯器(vim, notepad之類的)
直接修改UCI設定檔的內容, 來達到修改設定值的目的, 或者透過 uci 這個指令來修改設定值. 
UCI設定檔也可以透過各種的API(例如shell, Lua 和 C)來修改, 例如Web GUI就可以透過 LuCI 
來修改UCI設定檔.

當UCI設定檔被修改, 不論使用者用什麼方式(透過文字編輯器修改或是透過uci指令)修改的, 
其相關的service或是執行檔必須(重新)啟動, 方可讓修改過的設定值可以產生作用, (重新)
啟動的方式是透過init.d call.

目前許多程式已經支援UCI的作法, 並且已經有相關的init.d script來產生程式所需要的config檔.
這個意思是說, 這個 init.d script 會負責將UCI設定值轉換成「程式看得懂的config檔」, 
並且將config檔放置在程式要讀取的正確路徑中, 接著重新啟動程式.
因此, 若是我們直接(重新)啟動程式, 而不是透過 init.d calls的方式去啟動, 那會導致UCI中修改的設定值, 
並沒有經過「重新產生程式config檔」的步驟, 這樣一來, 使用者在/etc/config/所修改的設定, 
便不會真的產生作用.

example: vim /etc/config/network
option ipaddr   192.168.1.1  -> option ipaddr   192.168.2.1
root@OpenWrt:~# /etc/init.d/network restart



要修改系統的設定有很多種方式, 其中一種方法是直接修改UCI設定檔. 但是若是有需要在shell 
script中存取UCI設定值的時候, 則建議使用 uci 這個命令列工具比較方便.  

對於程式設計師而言, 或許常需要透過程式語言, 以自動化的方式去取的UCI設定值, 若直接透過 awk 和 grep 
這些指令去解析OpenWrt的設定值是十分沒有效率的作法; 因為 uci 這個工具已經提供了完整的功能, 
來存取UCI設定值.

When there are multiple rules next to each other, UCI uses array-like references for them. If there are 8 NTP servers, UCI will let you reference their sections as timeserver.@timeserver[0] for the first or timeserver.@timeserver[7] for the last one. You can also use negative indexes, such as timeserver.@timeserver[-1]. "-1" means the last one, "-2" means the second-to-last one, and so on. This comes in very handy when appending new rules to the end of a list. See the examples below.



Usage: uci [<options>] <command> [<arguments>]

Commands:
    batch                 ddsadsda
    export     [<config>]
    import     [<config>]
    changes    [<config>]
    commit     [<config>]
    add        <config> <section-type>
    add_list   <config>.<section>.<option>=<string>
    del_list   <config>.<section>.<option>=<string>
    show       [<config>[.<section>[.<option>]]]
    get        <config>.<section>[.<option>]
    set        <config>.<section>[.<option>]=<value>
    delete     <config>[.<section>[[.<option>][=<id>]]]
    rename     <config>.<section>[.<option>]=<name>
    revert     <config>[.<section>[.<option>]]
    reorder    <config>.<section>=<position>

Options:
    -c <path>  set the search path for config files (default: /etc/config)
    -d <str>   set the delimiter for list values in uci show
    -f <file>  use <file> as input instead of stdin
    -m         when importing, merge data into an existing package
    -n         name unnamed sections on export (default)
    -N         don't name unnamed sections
    -p <path>  add a search path for config change files
    -P <path>  add a search path for config change files and use as default
    -q         quiet mode (don't print error messages)
    -s         force strict mode (stop on parser errors, default)
    -S         disable strict mode
    -X         do not use extended syntax on 'show'