/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Johnson
 *
 * This program is free software: you can redistribute it and/or modify it under
 *   the terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 *   ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 *   for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { Breadcrumbs, Card, Code, H1, H2, H3, H4, IBreadcrumbProps, UL } from "@blueprintjs/core";

import Layout from "../../components/Layout";
import Link from "../../components/Link";
import React from "react";
import TOC from "../../components/TOC";
import WIP from "../../components/WIP";
import renderBreadcrumbs from "../../lib/renderBreadcrumbs";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        {
            text: "Instructions",
            href: "/instruction",
        },
        { text: "Help" },
    ];

    return (
        <Layout canonical="/instruction/help" navGroup="instruction" title="Instruction Page Help">
            <Card className="breadcrumbs" interactive>
                <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={PageBreadcrumbs} />
            </Card>
            <div id="main">
                <TOC.Root>
                    <TOC.Entry href="#headingOverviewTable" text="Overview Table" />
                    <TOC.Entry href="#headingEncoding" text="Encoding">
                        <TOC.Entry href="#headingEncodingOperand" text="Interpreting the Operand Value" />
                    </TOC.Entry>
                    <TOC.Entry href="#headingDescription" text="Description" />
                    <TOC.Entry href="#headingOperation" text="Operation">
                        <TOC.Entry href="#headingOperationMode" text="MODE" />
                        <TOC.Entry href="#headingOperationRegisters" text="Registers" />
                        <TOC.Entry href="#headingOperationFlags" text="Flags" />
                        <TOC.Entry href="#headingOperationInstructionBits" text="Instruction Bits" />
                        <TOC.Entry href="#headingOperationTypes" text="Types">
                            <TOC.Entry href="#headingOperationTypesSimd" text="Simd<T>" />
                            <TOC.Entry href="#headingOperationTypesKMask" text="KMask" />
                        </TOC.Entry>
                    </TOC.Entry>
                    <TOC.Entry href="#headingExamples" text="Examples" />
                    <TOC.Entry href="#headingFlags" text="Flags Affected" />
                    <TOC.Entry href="#headingIntrinsics" text="Intrinsics" />
                    <TOC.Entry href="#headingExceptions" text="Exceptions" />
                </TOC.Root>
                <div id="content">
                    <H1>Instruction Page Help</H1>
                    <WIP type="page" />
                    <p>
                        This page details many of the features of the instruction pages.
                    </p>

                    <H2 id="headingOverviewTable">Overview Table</H2>
                    TODO

                    <H2 id="headingEncoding">Encoding</H2>
                    <p>
                        The &quot;Encoding&quot; section is a table listing the encoding of the operands for the various opcodes in the overview table at the start.
                        Each row of the table consists of the following items, in order:
                    </p>
                    <UL>
                        <li>
                            <b>Encoding</b>:
                            The name of the encoding this row is for.
                            For example, if the &quot;Encoding&quot; cell of a mnemonic in the overview table contains <Code>RM</Code>, the row containing <Code>RM</Code> in this cell would list how the operands are encoded.
                        </li>
                        <li>
                            <b>Tuple Type</b> (optional):
                            The EVEX encoding&apos;s tuple form.
                            {/* TODO: What is it? */}
                            This column is only present if an EVEX encoding for this instruction exists.
                        </li>
                        <li>
                            <b>Operand(s)</b>:
                            The actual encoding of each operand.
                            Instructions that contain a different number of operands depending on the mnemonic (for example, vector instructions with a legacy encoding) will contain &quot;N/A&quot; for disallowed operands.
                            In other words, &quot;legacy&quot; vector encodings will typically have the first source and the destination be the same operand (<Code>MNEMONIC dest, src</Code>), but VEX and EVEX versions with a &quot;non-destructive&quot; form (<Code>MNEMONIC dest, src1, src2</Code>) will not.
                            In these cases, the &quot;legacy&quot; form will only have two operands while the VEX and EVEX forms will have three.
                            As such, the &quot;Operand 3&quot; cell will contain &quot;N/A&quot;.
                            <br />
                            <Link href="#headingEncodingOperand">See below</Link> for an explanation on interpreting this value.
                        </li>
                    </UL>

                    <H3 id="headingEncodingOperand">Interpreting the Operand Value</H3>
                    TODO

                    <H2 id="headingDescription">Description</H2>
                    TODO

                    <H2 id="headingOperation">Operation</H2>
                    <p>
                        The &quot;Operation&quot; section is pseudo-code that uses a Rust-like syntax.
                        While attempts are made to mimic Rust&apos;s syntax, some things are &quot;incorrect&quot;.
                        For example, Rust&apos;s ranges follow other programming languages with a &quot;start to end&quot; order.
                        This mimics how arrays are laid out in memory (index 0 is at a lower address than index n), however, a string of bits follows <Link href="https://en.wikipedia.org/wiki/Positional_notation">positional notation</Link> with the most significant bit (MSB) at the <em>left</em>.
                        Due to this, bit position slices use a &quot;high to low&quot; (&quot;end to start&quot;) order.
                    </p>

                    <H3 id="headingOperationMode">MODE</H3>
                    <p>
                        The <Code>MODE</Code> global variable represents the current operating mode of the processor thread.
                        It can be one of: <Code>16</Code>, <Code>32</Code>, or <Code>64</Code>, each representing the &quot;bit width&quot; of the current mode.
                        However, it is only compared against <Code>64</Code> for instructions that are illegal in <Link href="/architecture/mode/long">long (64 bit) mode</Link>.
                    </p>

                    <H3 id="headingOperationRegisters">Registers</H3>
                    <p>
                        Registers are accessed as if they were global variables.
                        Any aliasing, and the zero extension to <Code>RrX</Code> when setting <Code>ErX</Code>, is handled implicitly.
                    </p>

                    <H3 id="headingOperationFlags">Flags</H3>
                    <p>
                        Flags are accessed as if they were global variables.
                        For example, <Code>OF</Code> would refer to the <Link href="/architecture/register/flags">overflow flag</Link> (which is either a zero or a one).
                        These single bit values, when used in <Code>if</Code> conditions, are implicitly coerced to a boolean.
                        The only multibit flag, <Code>IOPL</Code>, is a two bit value and, as such, <em>cannot</em> be coerced.
                    </p>

                    <H3 id="headingOperationInstructionBits">Instruction Bits</H3>
                    <p>
                        Instruction prefixes are exposed as pseudo global variables.
                        For example, <Code>EVEX.b</Code> refers to the <Code>b</Code> (broadcast) bit in the <Code>EVEX</Code> prefix for the currently executing instruction.
                    </p>

                    <H3 id="headingOperationTypes">Types</H3>
                    <H4 id="headingOperationTypesSimd">Simd&lt;T&gt;</H4>
                    <p>
                        The most used type in the pseudo-code is the <Code>Simd&lt;T&gt;</Code> type.
                        It represents an <Link href="/architecture/register/vector">x86 vector register</Link>.
                        Currently, <Code>Simd::max()</Code> is <Code>512</Code> to correspond with the <Code>ZMM</Code> registers, but this will change if an &quot;AVX-1024&quot; were to be created.
                    </p>
                    <p>
                        The <Code>T</Code> generic is a numeric type (integer or floating point) that represents what the <Code>ZMM</Code> register contains.
                        For example, <Code>Simd&lt;f64&gt;</Code> represents a <Code>ZMM</Code> register containing eight &quot;double precision&quot; floating point (64-bit) numbers.
                    </p>
                    <p>
                        Operations on <Code>Simd&lt;T&gt;</Code> are at the &quot;bit level&quot;.
                        In other words, even though <Code>T</Code> represents the type of data, <Code>data[0]</Code> does <em>not</em> represent the first data value, but the first <em>bit</em>.
                        For example, to access the second data value in a <Code>Simd&lt;u32&gt;</Code>, <Code>data[63..=32]</Code> would be used.
                    </p>

                    <H4 id="headingOperationTypesKMask">KMask</H4>
                    <p>
                        In addition to the <Code>Simd&lt;T&gt;</Code> type for vector instructions, there also exists the <Code>KMask</Code> type.
                        It represents an <Link href="/architecture/register/mask">x86 mask register</Link> (<Code>k0</Code> through <Code>k7</Code>).
                        {" "}<Code>KMask</Code> is a 64 bit wide bit addressable type.
                        Each bit corresponds to the same bit in the x86 mask register with <Code>k[n]</Code> referring to the &quot;n-th&quot; bit of the underlying mask register.
                    </p>

                    <H2 id="headingExamples">Examples</H2>
                    TODO

                    <H2 id="headingFlags">Flags Affected</H2>
                    TODO

                    <H2 id="headingIntrinsics">Intrinsics</H2>
                    TODO

                    <H2 id="headingExceptions">Exceptions</H2>
                    TODO
                </div>
            </div>
        </Layout>
    );
}
