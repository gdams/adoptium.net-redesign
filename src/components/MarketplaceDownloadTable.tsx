import * as React from "react"
import { Link } from 'gatsby-plugin-react-i18next';
import { FaDownload } from 'react-icons/fa';
import { capitalize } from '../util/capitalize';
import { getImageForDistribution } from '../hooks'
import { fetchExtension } from '../util/fetchExtension';

const DownloadTable = ({results}) => {
    return (
        <table id="download-table" className="table table-bordered releases-table" style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
            <thead className="table-dark">
                <tr className="table-head">
                    <td className="table-head">Build Version</td>
                    <td className="table-head">Distribution</td>
                    <td className="table-head">Vendor</td>
                    <td className="table-head">Operating System</td>
                    <td className="table-head">Architecture</td>
                    <td className="table-head">Download</td>
                </tr>
            </thead>
            <tbody className="table-light">
                {results ? (
                    results.map(
                        (pkg, i): string | JSX.Element =>
                            <tr key={pkg.binary.package.checksum}>
                                <td className="table-secondary py-4 text-white align-middle w-20">
                                    <span>{pkg.release_name}</span>
                                    <br></br>
                                    <span>{pkg.binary.image_type == 'jdk' ? 'JDK' : 'JRE'}</span>
                                </td>
                                <td className="fw-bold align-middle">
                                    {capitalize(pkg.binary.distribution)}
                                </td>
                                <td className="align-middle">
                                    <img width="100px" src={getImageForDistribution(pkg.binary.distribution)}/>
                                </td>
                                <td className="align-middle">
                                    {capitalize(pkg.binary.os)}
                                </td>
                                <td className="align-middle">
                                    {pkg.binary.architecture}
                                </td>
                                <td className="align-middle">
                                    <table className="table parent mb-0 w-auto">
                                        <tbody className="table-light">
                                            {pkg.binary.installer && (
                                                <BinaryTable
                                                    checksum={pkg.binary.installer[0].sha265sum}
                                                    link={pkg.binary.installer[0].link}
                                                    os={pkg.binary.os}
                                                    arch={pkg.binary.architecture}
                                                    pkgType={pkg.binary.image_type}
                                                    javaVersion={pkg.release_name}
                                                    vendor={capitalize(pkg.vendor)}
                                                />
                                            )}
                                            <BinaryTable
                                                checksum={pkg.binary.package.sha265sum}
                                                link={pkg.binary.package.link}
                                                os={pkg.binary.os}
                                                arch={pkg.binary.architecture}
                                                pkgType={pkg.binary.image_type}
                                                javaVersion={pkg.release_name}
                                                vendor={capitalize(pkg.vendor)}
                                            />
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                    )
                ) :
                    <tr></tr>
                }
            </tbody>
        </table>
    );
};

export default DownloadTable;

interface DownloadProps {
    checksum: string,
    link: URL;
    os: string;
    arch: string;
    pkgType: string;
    javaVersion: string;
    vendor: string;
}

const BinaryTable = ({ checksum, link, os, arch, pkgType, javaVersion, vendor }: DownloadProps): null | JSX.Element => {
    return (
        <tr key={checksum}>
            <td className="align-middle text-center">
                <table><tbody>
                <tr>
                    <td>
                        <a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={checksum}>Checksum (SHA256)</a>
                    </td>
                </tr>
                </tbody></table>
            </td>
            <td className="align-middle">
                <Link to="/download" state={{ link: link, os: os, arch: arch, pkg_type: pkgType, java_version: javaVersion, vendor: vendor }} className="btn btn-primary" style={{width: "6em"}}>
                    <FaDownload /> {fetchExtension(link)}
                </Link>
            </td>
        </tr>
    )
}
