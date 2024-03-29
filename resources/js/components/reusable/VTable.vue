<template>
    <table>
        <thead>
            <slot name="header"></slot>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item[itemKey]">
                <template v-for="header in headers">
                    <slot :name="`item.${header}`" :value="item">
                        <td>
                            {{ item[header] }}
                        </td>
                    </slot>
                </template>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'VTable',
        data: () => {
            return {}
        },
        props: {
            items: {
                type: Array,
                required: true,
                default: []
            },
            itemKey: {
                type: String,
                required: true,
                default: 'id'
            },
            headers: {
                type: Array,
                required: false,
                default: null
            }
        }
    }
</script>
