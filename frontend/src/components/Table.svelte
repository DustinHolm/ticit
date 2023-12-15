<script lang="ts">
    export let headers: { name: string; width: string }[];
    export let rows: string[][];
</script>

<table>
    <thead>
        <tr>
            {#each headers as header}
                <th style:width={header.width}>{header.name}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each rows as row}
            <tr>
                {#each row as cell}
                    <td>{cell}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style lang="sass">
    table
        width: 100%
        text-align: left
        border-collapse: collapse
        table-layout: fixed

    tr:not(:last-child)
        border-bottom: 1px solid lightgrey
        
    td, th
        padding: 8px
        overflow-wrap: break-word
        word-wrap: break-word
</style>
