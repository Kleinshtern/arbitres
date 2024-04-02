<template>
    <div  style="overflow: visible">
        <table
            class="table table-rounded"
            :style="styles"
            :class="hoverEffect ? 'hovered' : ''"
        >
            <thead>
            <tr>
                <slot name="header">
                    <th
                        v-for="header in props.headers"
                        :key="header.key"
                        :class="`alignment-${header.alignment ?? 'left'}`"
                    >
                        <slot :name="`header.${header.key}`" :value="header.title">
                            {{ header.title }}
                        </slot>
                    </th>
                </slot>
            </tr>
            </thead>
            <tbody>
            <template v-for="item in items" :key="item[itemKey]">
                <slot name="item" :item="item">
                    <tr>
                        <template v-for="header in props.headers">
                            <td :class="`alignment-${header.alignment ?? 'left'}`">
                                <slot :name="`item.${header.key}`" :value="item[header.key]" :rootState="item">
                                    {{ item[header.key] }}
                                </slot>
                            </td>
                        </template>
                    </tr>
                </slot>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">

    export interface HeaderProp {
        key: number,
        title: string,
        alignment?: string
    }

    export interface Props {
        headers: Array<HeaderProp>,
        items: [],
        itemKey?: '',
        tableColor?: string,
        hoverEffect: boolean
    }


    const props = withDefaults(defineProps<Props>(), {
        headers: [],
        items: [],
        itemKey: 'id',
        tableColor: 'var(--main-color)',
        hoverEffect: false
    })
</script>

<script lang="ts">
    export default {
        name: 'VTable',
        data: () => {
            return {}
        },
        computed: {
            styles: function () {
                return {
                    '--table-color': this.tableColor
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .table {

        font-family: "Inter Medium", sans-serif;

        &.table-rounded {
            th, td {
                border: 0;

                &.alignment-center {
                    text-align: center;
                }
            }
            th {
                background-color: var(--table-color);
                color: white;
            }
            th:first-child {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
            th:last-child {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }

            tr {
                vertical-align: middle;
            }

            thead {
                &:after {
                    content: '';
                    display: block;

                    margin-bottom: 20px;
                }
            }

            tbody {
                tr {
                    &:first-child {
                        > td:first-child {
                            border-top-left-radius: 10px;
                        }
                        > td:last-child {
                            border-top-right-radius: 10px;
                        }
                    }
                    &:last-child {
                        > td:first-child {
                            border-bottom-left-radius: 10px;
                        }
                        > td:last-child {
                            border-bottom-right-radius: 10px;
                        }
                    }

                    td:not(:first-child) {
                        border-bottom: 1px solid var(--secondary-color);
                    }
                    td:not(:first-child, :last-child) {
                        border-right: 1px solid var(--secondary-color);
                    }

                    td:first-child {
                        background-color: var(--table-color);
                        color: white;
                    }
                }
            }
        }

        tr:first-child {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        tr:last-child {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        &.hovered {
            tbody {
                tr:hover {
                    cursor: pointer;

                    transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    -webkit-box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    -moz-box-shadow: 0 2px 8px rgba(0,0,0,0.2);

                    td:not(:first-child) {
                        color: var(--table-color);
                    }
                }
            }
        }
    }
</style>
